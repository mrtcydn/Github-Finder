import React, { useState , useContext} from 'react'
import GithubContext from '../context/github/githubContext'
import AlertContext from '../context/alert/alertContext'


const Search = ()=> {

    const {setAlert} = useContext(AlertContext)
    const {searchUsers,clearResults,users} = useContext(GithubContext)

    const [keyword,setKeyword] = useState('');

    const onChange = (e) =>{
        setKeyword(e.target.value)
        e.preventDefault();
    }

    const onSubmit = (e) => {
        if(keyword === ''){
            setAlert('Type a username for searching','danger');
        }else{
            searchUsers(keyword);
            setKeyword('')
        }
        e.preventDefault();
    }

        return (
            <div className="container mt-3">
                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <input type="text" value={keyword} onChange={onChange} className="form-control"/>
                        <div className="input-group-append">
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                    </div>
                </form>
                {
                    users.length>0 && <button onClick={clearResults} className="btn btn-secondary btn-sm btn-block mt-2">Clear Results</button>
                }            
            </div>
        )
}

export default Search
