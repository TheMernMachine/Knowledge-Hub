import { Helmet } from 'react-helmet-async';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { GET_ASSIGNMENT } from '../utils/queries';
import img from '../assets/images/underConstructionImg.png'


const theme = createTheme();

const StyledCover = styled('img')({
    top: 0,
    width: '75%',
    height: '75%',
    objectFit: 'fit',
    position: 'relative',
  });
  

export default function SingleAssignmentPage() {
    const { _id: assignmentId } = useParams();
    console.log(assignmentId);
    const { loading, data } = useQuery(GET_ASSIGNMENT,
    { variables: { id: `${assignmentId}` } });
    const assignment = data?.assignment || [];
    console.log(assignment);

    return (
        <>
            <Helmet>
                <title>Coming Soon!</title>
            </Helmet>

            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">

                    <StyledCover alt={'Under Construction'} src={img} />

                </Container>

            </ThemeProvider>


        </>
    );
}
