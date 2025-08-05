import React, { useState } from 'react'

const PollVoting = () => {
    console.log("object");
    const [hasVoted,setHasVoted]=useState(false)

    const [votes,setVotes]=useState([
        {id:1,option:"Option A", noOfVotes:1},
        {id:2,option:"Option B", noOfVotes:1},
        {id:3,option:"Option C", noOfVotes:2},
        {id:4,option:"Option D", noOfVotes:1},
        
    ])
    const totalVotes=votes.reduce((acc,vote)=>{
       return acc+vote.noOfVotes 
    },0)
console.log(totalVotes);
    const choose = (id)=>{
        if(hasVoted)return
        const updatedVote=votes.map(vote=>{
           return vote.id===id ? {...vote, noOfVotes:vote.noOfVotes+1}:vote
        })
        setVotes(updatedVote)
        setHasVoted(true)
    }
  return (
    <div>
        <ul>
        {
            votes.map(vote=>{
               return <li key={vote.id}>
                <p>{vote.option} : {vote.noOfVotes} votes and {totalVotes===0?0:Math.floor(vote.noOfVotes*100/totalVotes)}%</p>

                <button onClick={()=>choose(vote.id)} disabled={hasVoted}>choose any one</button>

                </li>
            })
        }
        </ul>
        {hasVoted && <p>Thank you for voting the poll</p>}

    </div>
  )
}

export default PollVoting