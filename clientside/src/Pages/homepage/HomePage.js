import React from 'react'
import Navbar from '../../Component/navbar/Navbar'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Sidebar from '../../Component/sidebar/Sidebar';
import Feed from '../../Component/feed/Feed';
import RightBar from '../../Component/rightbar/RightBar';


function HomePage() {
  return (
    <Box sx={{ width: '100%' }}>
    <Navbar/>
   <Grid  container rowSpacing={{sm:0,md:0}} columnSpacing={{ md:1,}}>
     <Grid container item sm={12} md={3} lg={3}>
    <Sidebar/>
     </Grid>
     <Grid container item sm={12} md={6}>
       <Feed/>
     </Grid>
     <Grid container item md={3}>
       <RightBar/>
       </Grid>
   </Grid>
 </Box>
  )
}

export default HomePage