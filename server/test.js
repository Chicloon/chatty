import Chat from './models/Chat';
import User from './models/User';

import newChat from './models/newChat';

export default () => {
  console.log('========================================');

  // newChat.find({}).populate('messages').exec((err, messages) => {
  //  console.log(messages); 
  // })


  // const user = User.findOne({_id: '5990e81e7e7bd14a465d1942'}, (res)=>console.log(res));

  let users = []
  console.log('before', users)


  const user = User.findById('5990e81e7e7bd14a465d1942')
    .then(user => {
      const chat = Chat.findById('5991381108fc5911ead6d80d')
        .then(thisChat => {
          thisChat.user = user._id
          user.chat = thisChat._id
          return Promise.all([user.save(), thisChat.save()])
            // .then((user) => {
            //   console.log(user);
            //   return user;
            // });
        })
    });



  console.log('after', users);




  // console.log(user.username);

  // user.save((err)=>{
  //   if (err) return handleError(err);




  // // })


  // Chat
  //   .findById('5991381108fc5911ead6d80d')
  //   .populate('user', 'username password')
  //   .exec((err, user)=>{
  //     console.log(user);
  //     console.log('chat', this);
  //   })


  // const chat = new Chat ({name: 'New Chat2', private: false, user: '5990e81e7e7bd14a465d1942'});
  // chat.save((err)=>{
  //   if (err) return handleError(err);
  //   console.log('chat created');
  // });

  // const chat = Chat.findById('59912d4763df19328a368f1d')
  //   .then (thisChat => {
  //     console.log(thisChat)

  //   });

  // chat.save((err) =>{
  //   if (err) return handleError(err);
  //   // const user = new User ({
  //   //   name: 'username',
  //   //   chat: chat.id
  //   // })
  //   const user = User.findById('5990e81e7e7bd14a465d1942')
  //     .then (thisUser => {
  //       thisUser.chats.push(chat);
  //       thisUser.save((err)=>{ 
  //       if (err) return handleError(err);
  //       console.log('User saved', thisUser);    
  //     });
  //     })


  // });





  console.log('========================================');
}