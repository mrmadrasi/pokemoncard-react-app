import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function BodyContent() {
    const [data, setData] = useState({data: []});
    const [searchText, setSearchText] = useState('');

    const handleClick = async () => {
            const response = await fetch('http://localhost:5000/pokemon/ability?search='+searchText, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const result = await response.json();

            console.log('result is: ', JSON.stringify(result, null, 4));

            setData(result);
    };

    return (
        <main>
            <input type="text" className="form-control" name="searchText" value={searchText} onChange={event => setSearchText(event.target.value)}/>
            <button className="btn btn-primary" onClick={handleClick}>search</button>


            <div className="row">
                {!data?.success ?
                    (
                        <div><h4 className="text-bg-danger">Not Found Pokemon Try To Find</h4></div>
                    )
                    :(
                        <div className="card w-50 m-auto">
                            <img src={data?.data?.pokemon?.length > 0 ? 'http://localhost:5000/uploads/'+ data?.data?.pokemon[0]?.image : ""} className="img-thumbnail img-fluid w-25 m-auto" alt="logo"/>
                            <div className="card-body">
                                <h5 className="card-title">{data?.data?.pokemon?.length > 0 ? data?.data?.pokemon[0]?.name :""}</h5>
                                <table className="table">
                                    <tr>
                                        <th>Ability</th>
                                        <th>Type</th>
                                        <th>Damage</th>
                                    </tr>
                                    {data?.data?.ability && data?.data?.ability.map(abilitys => {
                                        return (
                                            <tr key={abilitys.id}>
                                                <td>{abilitys.ability}</td>
                                                <td>{abilitys.type}</td>
                                                <td>{abilitys.damage}</td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </div>
                        </div>
                    )}
            </div>
        </main>
    );
}

export default BodyContent;