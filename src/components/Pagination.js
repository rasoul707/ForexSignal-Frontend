/* eslint-disable react-hooks/exhaustive-deps */

import * as React from "react"
import { Pagination } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from "query-string";



const PaginationNav = ({ count, max, runner }) => {

    const history = useHistory()
    const location = useLocation()
    const current = parseInt(queryString.parse(location.search)['page'] || '1', 10)

    React.useEffect(() => { runner(current) }, [current])

    const pages = Math.ceil(count / max)
    if (pages <= 1) return null
    return <Pagination
        count={pages}
        page={current}
        onChange={(e, val) => history.push(val === 1 ? location.pathname : `?page=${val}`)}
        shape="rounded"
        sx={{ display: "flex", justifyContent: "center" }}
    />

}


export default PaginationNav