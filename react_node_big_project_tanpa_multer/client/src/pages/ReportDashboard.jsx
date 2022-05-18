import React, { useEffect, useState } from 'react'
const ReportDashboard = async () => {
    try {
        const res = await fetch ("http://localhost:3500/list_barang")
        const dataBarangs = await res.json()

        setBarangs(dataBarangs)
    } catch (error) {
        console.error(error.message)
    }
}

useEffect(() => {
    getBarangs()
}, [])
  
  export default ReportDashboard