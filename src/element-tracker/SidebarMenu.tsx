import React, { useState, useLayoutEffect, useCallback, useEffect } from "react"

import styled from "styled-components"

import { useElementTracker, Component } from "@cs125/element-tracker"
import { List } from "semantic-ui-react"

import { debounce } from "throttle-debounce"

const HoverItem = styled(List.Item)`
  :hover {
    cursor: pointer;
  }
`

export const SidebarMenu: React.FC = () => {
  const { components } = useElementTracker()
  const [headers, setHeaders] = useState<(Component & { active: boolean })[]>([])
  const [visible, setVisible] = useState<boolean>(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateVisible = useCallback(
    debounce(100, () => {
      const contentHeight = document.body.scrollHeight
      const windowHeight = window.innerHeight
      setVisible(contentHeight > windowHeight)
    }),
    [setVisible]
  )

  useEffect(() => {
    updateVisible()
    window.addEventListener("load", updateVisible)
    window.addEventListener("hashchange", updateVisible)
    window.addEventListener("resize", updateVisible)
    return (): void => {
      window.removeEventListener("load", updateVisible)
      window.removeEventListener("hashchange", updateVisible)
      window.removeEventListener("resize", updateVisible)
      updateVisible.cancel()
    }
  }, [updateVisible])

  useLayoutEffect(() => {
    if (!components || components.length === 0) {
      setHeaders([])
      return
    }
    const newHeaders = components
      .filter(c => c.tag === "h2")
      .map(c => {
        return { ...c, active: false }
      })
    if (newHeaders.length === 0) {
      setHeaders([])
      return
    }
    const onScreenHeaders = newHeaders.filter(c => c.top >= 0)
    const offScreenHeaders = newHeaders.filter(c => c.top < 0)
    if (onScreenHeaders.length > 0 && onScreenHeaders[0].bottom < onScreenHeaders[0].height) {
      onScreenHeaders[0].active = true
    } else if (offScreenHeaders.length > 0) {
      offScreenHeaders[offScreenHeaders.length - 1].active = true
    } else {
      newHeaders[0].active = true
    }
    setHeaders(newHeaders)
  }, [components])

  if (!visible) {
    return null
  }
  return (
    <List size="large">
      {headers.map((header, i) => {
        const headerLocation = `${window.location.href.split("#")[0]}#${header.id}`
        return (
          <HoverItem
            onClick={(): void => {
              window.location.href = headerLocation
            }}
            key={i}
          >
            {header.active ? <strong>{header.text}</strong> : <span>{header.text}</span>}
          </HoverItem>
        )
      })}
    </List>
  )
}
