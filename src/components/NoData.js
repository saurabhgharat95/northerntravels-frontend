const noDataImg = process.env.PUBLIC_URL+"/images/vectors/no-data.jpg"

const NoData = () =>{
    return (
        <div className="text-center">
            <img src={noDataImg} style={{width:"400px",height:"400px"}}/>
        </div>
    )
}

export default NoData