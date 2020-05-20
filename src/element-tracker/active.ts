import { Component } from "@cs125/element-tracker"

export function atTop(): boolean {
  return (document.documentElement.scrollTop || document.body.scrollTop) === 0
}
export function atBottom(): boolean {
  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
  return (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight === documentHeight
}

export function active<T extends Component>(components: Array<T>): T | undefined {
  if (components.length === 0) {
    return undefined
  }
  if (components.length === 1) {
    return components[0]
  }

  if (atBottom() && window.location.hash) {
    const hashedComponent = components.find(c => c.id === window.location.hash.substring(1))
    if (hashedComponent && hashedComponent.top >= 0) {
      return hashedComponent
    }
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
