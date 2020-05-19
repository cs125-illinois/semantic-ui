import React, { useState, useCallback } from "react"
import { useGoogleLogin } from "@cs125/react-google-login"

import { Button, ButtonProps, Icon } from "semantic-ui-react"

export const LoginButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { ready, auth, isSignedIn } = useGoogleLogin()
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

  return (
    <Button
      positive={!isSignedIn}
      loading={!ready || busy}
      disabled={!ready}
      onClick={loginOrOut(isSignedIn)}
      {...props}
    >
      {!isSignedIn ? (
        <>
          <Icon name="google" /> Login
        </>
      ) : (
        <div style={{ padding: "0.1em 0.3em" }}>Logout</div>
      )}
    </Button>
  )
}
