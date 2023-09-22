import SearchGroup from "./SearchGroup";
import SearchPost from "./SearchPost";
import SearchUser from "./SearchUser";

export default function SearchAll(){
    return (
        <>
        <SearchPost/>
        <SearchGroup/>
        <SearchUser/>
        </>
    )
}