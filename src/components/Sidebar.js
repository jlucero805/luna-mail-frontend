import React from 'react'
import logo from '../static/luna-mail-logo.svg'

const Sidebar = props => {
   return (
       <div className="sidebar">
           <img src={logo} alt="Luna Mail" className="logo"></img>
           <div className={props.page == 'detail' ? 'side-btns-new-mail' : 'side-btns none'}>
               <div className="btn-pop">reply</div>
               <div onClick={() => props.deleteClicker()} className="btn-pop">delete</div>
           </div>
           <div className={props.page == 'inbox' ? 'side-btns-new-mail' : 'side-btns none'}>
               <div className="btn-pop">refresh</div>
           </div>
           <div className={props.page == 'new-mail' ? 'side-btns-new-mail' : 'side-btns none'}>
               <div onClick={() => props.sendClicker()} className="btn-pop">send</div>
               <div onClick={() => props.newMailClear()} className="btn-pop">clear</div>
           </div>
           <div className="side-btns">
               <div onClick={() => props.newMailClicker()} className="btn">new mail</div>
               <div onClick={() => props.inboxClicker()} className="btn">inbox</div>
               <div className="btn">sent</div>
               <div className="btn">contacts</div>
               <div className="btn">settings</div>
               <div className="btn">info.</div>
               <div onClick={() => props.logoutClicker()} className="btn logout-text">logout</div>
           </div>
       </div>
   ) 
}

export default Sidebar