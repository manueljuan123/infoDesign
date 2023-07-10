import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from 'react-router-dom';

export function MySideNav() {
    const navigate = useNavigate();

    return <SideNav onSelect={selected => {
        navigate('/'+selected)
    }}
      className='mysidenav'
    >
        <SideNav.Toggle/>
        <SideNav.Nav defaultSelected='tramos'>
            <NavItem eventKey='tramos'>
                <NavIcon>
                    <i className="fas fa-chart-column"></i>
                </NavIcon>
            <NavText>Tramos</NavText>
            </NavItem>

            <NavItem eventKey='tramos-cliente'>
                <NavIcon>
                    <i className="fas fa-chart-line"></i>
                </NavIcon>
            <NavText>Tramos Cliente</NavText>
            </NavItem>

            <NavItem eventKey='cliente'>
                <NavIcon>
                    <i className="fas fa-chart-bar"></i>
                </NavIcon>
            <NavText>Cliente</NavText>
            </NavItem>
        </SideNav.Nav>

    </SideNav>
}