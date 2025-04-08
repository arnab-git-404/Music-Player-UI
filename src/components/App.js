import React, { useContext, useState } from 'react';
import { Container, Row, Col, Nav, Modal, Button, Offcanvas } from 'react-bootstrap';
import { MusicContext } from '../context/MusicContext';
import MusicPlayer from './MusicPlayer';
import SongList from './SongList';
import SearchBar from './SearchBar';
import Favorites from './Favorites';
import RecentlyPlayed from './RecentlyPlayed';
import { FaSpotify } from 'react-icons/fa';
import '../styles/App.scss';

const App = () => {
  const { activeTab, setActiveTab, dominantColor } = useContext(MusicContext);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCloseProfileModal = () => setShowProfileModal(false);
  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  return (
    <div className="app-container" style={{
      background: `linear-gradient(to bottom, ${dominantColor}, #121212)`,
      transition: 'background 0.5s ease'
    }}>
      <Container fluid>
        <Row>


          {/* Hamburger Menu for Mobile */}
          <Button 
            variant="dark" 
            className="" 
            onClick={handleShowSidebar}
          >
            <i className="bi bi-list"></i>
          </Button>


          {/* Sidebar Offcanvas */}
          <Offcanvas show={showSidebar} onHide={handleCloseSidebar} className="sidebar-offcanvas">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <FaSpotify className="spotify-icon me-2" />
                Spotify
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column sidebar-nav">
                <Nav.Link 
                  eventKey="songs" 
                  className={`sidebar-nav-link ${activeTab === 'songs' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('songs');
                    handleCloseSidebar();
                  }}
                >
                  <i className="bi bi-music-note-list me-2"></i>
                  All Songs
                </Nav.Link>
                <Nav.Link 
                  eventKey="favorites" 
                  className={`sidebar-nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('favorites');
                    handleCloseSidebar();
                  }}
                >
                  <i className="bi bi-heart me-2"></i>
                  Favorites
                </Nav.Link>
                <Nav.Link 
                  eventKey="recent" 
                  className={`sidebar-nav-link ${activeTab === 'recent' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('recent');
                    handleCloseSidebar();
                  }}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Recently Played
                </Nav.Link>
                <Nav.Link 
                  className="sidebar-nav-link" 
                  onClick={() => {
                    handleShowProfileModal();
                    handleCloseSidebar();
                  }}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>

          {/* New Left Side Panel */}
          <Col lg={2} md={2} sm={3} className="left-sidebar d-none d-lg-block">
            <div className="sidebar-content">
              <div className="sidebar-logo mb-4">
                <FaSpotify className="spotify-icon" />
                <h3>Spotify</h3>
              </div>
              <Nav className="flex-column sidebar-nav mb-4">
                <Nav.Link 
                  eventKey="songs" 
                  className={`sidebar-nav-link ${activeTab === 'songs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('songs')}
                >
                  <i className="bi bi-music-note-list me-2"></i>
                  All Songs
                </Nav.Link>
                <Nav.Link 
                  eventKey="favorites" 
                  className={`sidebar-nav-link ${activeTab === 'favorites' ? 'active' : ''}`}
                  onClick={() => setActiveTab('favorites')}
                >
                  <i className="bi bi-heart me-2"></i>
                  Favorites
                </Nav.Link>
                <Nav.Link 
                  eventKey="recent" 
                  className={`sidebar-nav-link ${activeTab === 'recent' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recent')}
                >
                  <i className="bi bi-clock-history me-2"></i>
                  Recently Played
                </Nav.Link>
              </Nav>
              <div className="user-profile mt-auto">
                <Nav.Link 
                  className="sidebar-nav-link" 
                  onClick={handleShowProfileModal}
                >
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </Nav.Link>
              </div>
            </div>
          </Col>
          
          {/* Adjusted main content width */}
          <Col lg={6} md={5} sm={9} className="main-content">
            <SearchBar />
            
            <Nav className="mb-4 tab-navigation" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
              <Nav.Item>
                <Nav.Link eventKey="songs" className="custom-nav-link">All Songs</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="favorites" className="custom-nav-link">Favorites</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="recent" className="custom-nav-link">Recently Played</Nav.Link>
              </Nav.Item>
            </Nav>
            
            {activeTab === 'songs' && <SongList />}
            {activeTab === 'favorites' && <Favorites />}
            {activeTab === 'recent' && <RecentlyPlayed />}
          </Col>
          
          <Col lg={4} md={5} sm={12} className="player-sidebar">
            <MusicPlayer />
          </Col>
        </Row>
      </Container>

      {/* Profile Modal */}
      <Modal 
        show={showProfileModal} 
        onHide={handleCloseProfileModal}
        centered
        className="profile-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile-content">
            <div className="profile-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
            <h4>User Name</h4>
            <p>arnab@gmail.com</p>
            <div className="profile-stats">
              <div className="stat-item">
                <h5>12</h5>
                <p>Playlists</p>
              </div>
              <div className="stat-item">
                <h5>24</h5>
                <p>Followers</p>
              </div>
              <div className="stat-item">
                <h5>48</h5>
                <p>Following</p>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;