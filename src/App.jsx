import React from 'react'
import UserCard from './MachineCodingComp/UserCard'
import LimitCounter from './EasyComponents/LimitCounter'

const App = () => {
  return (
    <div>
      {/* <UserCard fullname={"sandip bhatt"} bio={"asvhjsdajfvsdaujvfadsjvndsjvhgckgtkugtuktgcuktuktutgutuktututlhlhlhvjhvlhvlhvhvkhvhvkhvil;hyhki;khihyiylhblkhihiyfyrdufutfutfuyflvuhyluylulugvuguguyvuhvguhvuvuvh"} email={"sandip#209"}/> */}
      <LimitCounter min={0} max={5}/>

    </div>
  )
}

export default App