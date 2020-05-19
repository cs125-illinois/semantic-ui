import { Component } from "@cs125/element-tracker"

export function active<T extends Component>(components: Array<T>): T | undefined {
  if (components.length === 0) {
    return undefined
  }
  if (components.length === 1) {
    return components[0]
  }
  const onScreenHeaders = components.filter(c => c.top >= 0)
  const offScreenHeaders = components.filter(c => c.top < 0)
  if (onScreenHeaders.length > 0 && onScreenHeaders[0].bottom < onScreenHeaders[0].height) {
    return onScreenHeaders[0]
  } else if (offScreenHeaders.length > 0) {
    return offScreenHeaders[offScreenHeaders.length - 1]
  } else {
    return components[0]
  }
}
