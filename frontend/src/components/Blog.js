import { TableRow, TableCell } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

//Toggleable seems to actually work just fine?
//import Toggleable from './Toggleable'

const Blog = ({ blog }) => {

  return (
    <TableRow>
      <TableCell><Link to={`/blogs/${blog.id}`}>{`${blog.title} by ${blog.author}`}</Link></TableCell>
    </TableRow>
  )}

export default Blog
