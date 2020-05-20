import React, { useMemo, useRef, useCallback, useEffect } from "react"
import PropTypes from "prop-types"

import { useElementTracker } from "@cs125/element-tracker"
import { active, atBottom, atTop } from "./active"
import mobile from "is-mobile"

const isMobile = mobile()

interface UpdateHashProps {
  tags: string[]
}
export const UpdateHash: React.FC<UpdateHashProps> = ({ tags }) => {
  const hash = useRef<string>((typeof window !== `undefined` && window.location.hash) || " ")
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
    if (!components || (atTop() && !atBottom())) {
      setHash(" ")
      return
    }
    const activeHash = components && active(components.filter(c => c.id && tags.includes(c.tag)))
    setHash(activeHash ? `#${activeHash.id}` : " ")
  }, [tags, components, setHash])

  useEffect(() => {
    const hashListener = (): void => {
      setHash(window.location.hash || " ")
    }
    window.addEventListener("hashchange", hashListener)
    return (): void => {
      window.removeEventListener("hashchange", hashListener)
    }
  }, [setHash])

  return null
}
UpdateHash.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}
UpdateHash.defaultProps = {
  tags: ["h2"],
}
