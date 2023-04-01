import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getTotalNumPublicGists, getAllPublicGistsByUser } from './api/gistApi';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import './App.css';
import { Button } from '@mui/material';
import ListGists from './components/ListGists';

const BootstrapButton = styled(Button)({
  marginTop: '5px'
});

function App() {
  const [searchTerm, setSearchTrrm] = useState<string>('');
  const [gistUserName, setGistUserName] = useState<string>('');
  const [pageNum, setPageNum] = useState(1);
  
  const {
    data: totalGist
  }= useQuery(['totalGist',gistUserName], () => getTotalNumPublicGists(searchTerm), { enabled: gistUserName.length !== 0}) 
  
  const { 
    isLoading,
    isError,
    data: totalGistData
  } = useQuery(['gistDataFound', gistUserName, pageNum], () => getAllPublicGistsByUser(gistUserName, pageNum) , { enabled: gistUserName.length !== 0});


  const handleSearch = () => {
    setGistUserName(searchTerm);
  }


  const handlePageChange = (page: any) => {
    setPageNum(page)
  }


  return (
    <>
    <Box
      className='container'
      component="div"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
    >
      <Box className='innerDiv'>
      <TextField className='searchFld' size='medium' id="outlined-basic" value={searchTerm} 
        label="Username" variant="outlined" 
        onChange={(event) => setSearchTrrm(event.target.value)} 
        fullWidth 
      />
      <BootstrapButton disabled={searchTerm.length < 3 || isLoading} variant="contained" className='searchBtn' onClick={handleSearch}>Search Gists</BootstrapButton>
      </Box>
    </Box>
    {isError ? (
      <Box className='container'
      component="div">
        There Seems to be an Error Please Try Again
      </Box>
    ) : !totalGist && gistUserName !== '' ? (
        <Box className='container'
        component="div">
          No Public Gists Found
        </Box>
    ) : (
      gistUserName !== '' && <ListGists totalNumGists={totalGist as number} gistData={totalGistData !== undefined ? totalGistData : []} updateCurrentPage={handlePageChange}/>
    )}
    
    </>
  );
}

export default App;
