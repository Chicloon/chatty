import Chat from './models/Chat';
import User from './models/User';

export default () => {
  console.log('========================================');

  // newChat.find({}).populate('messages').exec((err, messages) => {
  //  console.log(messages); 
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

Chat.addUser('5991807ae311c77ad3820996', '598d9f01e467333c48bad194');

  // console.log('after', users);




  // console.log(user.username);

  // user.save((err)=>{
  //   if (err) return handleError(err);




  // // })


  // Chat
  //   .findById('599169fa32eb843bacae987b')
  //   .populate('user', 'username password')
  //   .exec((err, user) => {
  //     console.log(user);
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