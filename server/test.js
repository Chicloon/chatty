import Chat from './models/Chat';
import User from './models/User';
import Message from './models/Message';

export default () => {
  console.log('========================================');

// const message = Message.findById('5993beec517d0c3e3b4d63ed')
//   .then(message=>{
//     User.findById('5993dc625a6f014a56763df8')
//       .then(user=>{
//         user.messages.push(message._id);
//        console.log(user);
//       })
//   })




// console.log(user);
  // Chat.addUser('5993a86600bd5a6f9ea5768d', '5993ac687c87b61821353048')

  // User.addMessage('5990e81e7e7bd14a465d1942', 'One more message')

  // Chat
  //   .findById('5991381108fc5911ead6d80d')
  //   .populate('users.user', 'username')
  //   .populate('messages')
  //   .exec((err, chat) => {
  //     // console.log(chat);
  //     console.log(chat.users)
  //   })

// message 59939030e75acd7be98637e2


  // newChat.find({}).populate('messages').exec((err, messages) => {
  //  console.log(messages); 
  // })
  
  // const message = new Message({content: 'Message content', user: '5990e81e7e7bd14a465d1942'});
  // message.save()
  //   .then((res)=> console.log('message created', res))
  
// const chat = new Chat();
// chat.save()

  // Chat.addUser('5991807ae311c77ad3820996', '598d9f01e467333c48bad194');

//  chat ObjectId("5991a807c8bb733eec4bd202")

  // Chat.addMessage('59916a0b6d7fec20b82d1e18', '59919fd73200a50084b4ddeb')
  //   .then(res=>{
  //     console.log('res', res);
     
  //   })


    // Chat
    // .findById('59916a0b6d7fec20b82d1e18')
    // .populate('users.user')
    // .exec((err, messages)=> {
    //   console.log('messages', messages);
    // })

  // const user = User.findOne({_id: '5990e81e7e7bd14a465d1942'}, (res)=>console.log(res));
  
  // user ObjectId("598d9f01e467333c48bad194")

  //me  ObjectId("598d9cbae467333c48bad192")

  // // const user = User.findById('598d9f01e467333c48bad194')
  //   const user = User.findById('598d9cbae467333c48bad192')
  //   .then(user => {
  //     Chat.findById('599169fa32eb843bacae987b')
  //       .then(chat => {
  //         chat.users.push({user: user._id, access: 10});
  //         user.chats.push(chat._id);      
  //         return Promise.all([chat.save()])            
          
          
          
  //         // return Promise.all([user.save(), chat.save()])
  //         // // .then((user) => {
  //         // //   console.log(user);
  //         // //   return user;
  //         // // });
  //       })
  //       .then(() => {
  //         return Promise.all( [user.save()])
  //           .then(() => {
  //             Chat
  //               .findById('599169fa32eb843bacae987b')
  //               .populate('user', 'username password')
  //               .exec((err, user) => {
  //                 console.log(user);
  //               })
  //           })
  //       })
  //   });
// const newChat = new Chat();


  // console.log('after', users);




  // console.log(user.username);

  // user.save((err)=>{
  //   if (err) return handleError(err);




  // // })

  


  


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