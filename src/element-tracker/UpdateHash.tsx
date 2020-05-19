import React, { useMemo, useRef, useCallback, useEffect } from "react"

import { useElementTracker } from "@cs125/element-tracker"
import { active, atBottom } from "./active"
import mobile from "is-mobile"

const isMobile = mobile()

export const UpdateHash: React.FC<{ tags: string[] }> = ({ tags }) => {
  const hash = useRef<string>((typeof window !== `undefined` && window.location.hash) || "#")
  const hashTimer = useRef<number | undefined>(undefined)

  const setHash = useCallback((newHash: string) => {
    if (hashTimer.current) {
      clearTimeout(hashTimer.current)
    }
    hashTimer.current = setTimeout(
      () => {
        if (hash.current !== newHash) {
          hash.current = newHash
          window.history.replaceState({}, "", newHash)
        }
      },
      isMobile ? 100 : 0
    )
  }, [])

  const { components } = useElementTracker()
  useMemo(() => {
    if (!components || ((document.documentElement.scrollTop || document.body.scrollTop) === 0 && !atBottom())) {
      setHash("#")
      return
    }
    const activeHash = components && active(components.filter(c => c.id && tags.includes(c.tag)))
    setHash(activeHash ? `#${activeHash.id}` : "#")
  }, [tags, components, setHash])

  useEffect(() => {
    const hashListener = (): void => {
      setHash(window.location.hash || "#")
    }
    window.addEventListener("hashchange", hashListener)
    return (): void => {
      window.removeEventListener("hashchange", hashListener)
    }
  }, [setHash])

  return null
}
