import React, { useMemo, useRef } from "react"

import { useElementTracker } from "@cs125/element-tracker"

export const UpdateHash: React.FC<{ tags: string[] }> = ({ tags }) => {
  const hash = useRef<string>("#")
  const { components } = useElementTracker()

  useMemo(() => {
    if ((document.documentElement.scrollTop || document.body.scrollTop) === 0 && hash.current !== "#") {
      hash.current = "#"
      window.history.replaceState({}, "", "#")
      return
    }
    const firstVisible = components?.find(c => c.top > 0 && c.bottom < c.height && c.id && tags.includes(c.tag))
    if (firstVisible) {
      const newHash = `#${firstVisible.id}`
      if (hash.current !== newHash) {
        hash.current = newHash
        window.history.replaceState({}, "", `#${firstVisible.id}`)
      }
    }
  }, [tags, components])

  return null
}
