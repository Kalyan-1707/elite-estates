import { Input } from '@nextui-org/react'
import {SearchIcon} from '../SearchIcon';
import React from 'react'


function SearchBar() {
  return <Input
  type="search"
  placeholder="search"
  classNames={{
    base: [
      'items-center',
    ],
    mainWrapper: [
      'justify-center',
      'w-[400px]',
      'max-w-80',
    ],
    inputWrapper: [
      'rounded-3xl',
      'px-5',
      'py-2',
    ]
  }}
  endContent={
    <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
  }
/>
}

export default SearchBar