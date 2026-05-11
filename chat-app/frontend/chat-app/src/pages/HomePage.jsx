import { useChathook }  from "../hooks/useChathook";
import Sidebar from "../components/Sidebar"
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import Chatbot from "../components/Chatbot";
import useAuthhook from "../hooks/useAuthhook";
const HomePage = () => {
  const { selectedUser,setSelectedUser } = useChathook();
  const {authUser} = useAuthhook();
const agentNames = ["Technical Support", "Pre-Sales Consultation", "Sales And Billing"];
const isAgent = agentNames.includes(authUser.fullName);
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!isAgent ? (
  !selectedUser ? (
    <Chatbot setSelectedUser={setSelectedUser} />
  ) : (
    <ChatContainer selectedUser={selectedUser} />
  )
) : (
  !selectedUser ? (
    <NoChatSelected />
  ) : (
    <ChatContainer selectedUser={selectedUser} />
  )
)}

            {/* {!selectedUser && authUser.fullName !== 'Technical Support' ? <Chatbot/> : <NoChatSelected/>} */}
            {/* {!selectedUser && authUser.fullName === 'Technical Support' ? <ChatContainer /> : ""} */} 
            {/* {!selectedUser && authUser.fullName !== 'Technical Support' && <Chatbot /> } */}

            {/* {!selectedUser && authUser.fullName === 'Technical Support' && <NoChatSelected />} */}

            {/* {!selectedUser ? <NoChatSelected/> : <ChatContainer/>} */}
             {/* console.log(selectedUser", selectedUser) */}
            {/* {selectedUser.fullName == "Technical Support" ? <ChatContainer/> : <Chatbot/>} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;