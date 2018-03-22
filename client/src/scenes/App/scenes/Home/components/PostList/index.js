// @flow
import type { Node } from 'react'
import React from 'react'
import List from 'material-ui/List'

type Props = {
  children?: Node
}

export default (props: Props) => (<List disablePadding>
  {props.children}
</List>)
