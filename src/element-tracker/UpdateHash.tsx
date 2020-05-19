import React, { useMemo, useRef, useCallback } from "react"

import { useElementTracker } from "@cs125/element-tracker"
import { active } from "./active"

export const UpdateHash: React.FC<{ tags: string[] }> = ({ tags }) => {
  const hash = useRef<string>("#")
  const setHash = useCallback((newHash: string) => {
    if (hash.current !== newHash) {
      hash.current = newHash
      window.history.replaceState({}, "", newHash)
    }
  }, [])

  const { components } = useElementTracker()
  useMemo(() => {
    if (!components || (document.documentElement.scrollTop || document.body.scrollTop) === 0) {
      setHash("#")
      return
    }
    const activeHash = components && active(components.filter(c => c.id && tags.includes(c.tag)))
    setHash(activeHash ? `#${activeHash.id}` : "#")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, components])

  return null
}
