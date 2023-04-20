import { createContext, useState } from "react";

export const UserContext = createContext();

// export default function UserProvider({children}) {
//     const [user, setUser] = useState();

//     return(
//         <UserContext value={{user, setUser}}>
//             {children}
//         </UserContext>
//     )
    
// }