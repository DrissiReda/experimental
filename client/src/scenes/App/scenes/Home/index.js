// @flow
import React from 'react'
import PostList from './components/PostList/index'
import Post from './components/Post/index'

const dummyMessages = [
  {
    id: 1,
    date: '12/12/2012',
    author: {
      id: 1,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque tortor diam. Curabitur at lacus nec erat blandit rhoncus at ut ante. Integer pharetra aliquet velit sed hendrerit. Praesent sit amet accumsan nibh. Aliquam sed.'
  },
  {
    id: 2,
    date: '12/12/2012',
    author: {
      id: 1,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum imperdiet dui eu enim mattis sagittis. Donec nullam.'
  },
  {
    id: 3,
    date: '12/12/2012',
    author: {
      id: 1,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum imperdiet dui eu enim mattis sagittis. Donec nullam.'
  },
  {
    id: 4,
    date: '12/12/2012',
    author: {
      id: 2,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit posuere.'
  },
  {
    id: 5,
    date: '12/12/2012',
    author: {
      id: 2,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum scelerisque tortor diam. Curabitur at lacus nec erat blandit rhoncus at ut ante. Integer pharetra aliquet velit sed hendrerit. Praesent sit amet accumsan nibh. Aliquam sed.'
  },
  {
    id: 6,
    date: '12/12/2012',
    author: {
      id: 2,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit posuere.'
  },
  {
    id: 7,
    date: '12/12/2012',
    author: {
      id: 3,
      name: 'John Doe',
      avatarUrl: 'https://www.shareicon.net/data/128x128/2016/09/02/824411_man_512x512.png'
    },
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing volutpat.'
  }
]

export default () => (<PostList>
  {dummyMessages.map(message => (<Post key={message.id} date={message.date} author={message.author.name} avatar={message.author.avatarUrl}>
    {message.text}
  </Post>))}
</PostList>)

// add canDelete (boolean) prop to Post to indicate if a trash can button should be rendered
// add an 'on delete' prop callback to Post
// Create a LoadMoreButton component
// Create an EditBox component, only shown when connected (show a 'sign in or sign up to post' button otherwise)
