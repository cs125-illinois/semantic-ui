import React, { useState, useCallback } from "react"
import { useGoogleLogin } from "@cs125/react-google-login"

import { Button, ButtonProps } from "semantic-ui-react"
import { FaGoogle } from "react-icons/fa"

export const LoginButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { ready, auth, isSignedIn, err } = useGoogleLogin()
  const [busy, setBusy] = useState<boolean>(false)

  const loginOrOut = useCallback(
    (isSignedIn: boolean | undefined) => async (): Promise<void> => {
      if (!auth) {
        return
      }
      setBusy(true)
      try {
        await (!isSignedIn ? auth.signIn() : auth.signOut())
      } finally {
        setBusy(false)
      }
    },
    [auth, setBusy]
  )

  let content
  if (err !== undefined) {
    content = <div style={{ padding: "0.1em 0.7em" }}>Error</div>
  } else if (!isSignedIn) {
    content = (
      <div>
        <FaGoogle style={{ paddingTop: "0.1em" }} /> Login
      </div>
    )
  } else {
    content = <div style={{ padding: "0.1em 0.3em" }}>Logout</div>
  }

  return (
    <Button
      positive={!err && !isSignedIn}
      negative={err !== undefined}
      loading={!err && (!ready || busy)}
      disabled={err !== undefined || !ready}
      onClick={
        !err
          ? loginOrOut(isSignedIn)
          : (): void => {
              return
            }
      }
      {...props}
    >
      {content}
    </Button>
  )
}
