import React from 'react'

const navbar = () => {
  return (
    <div id="nav-bar">
      <div id="nav-header"><a id="nav-title" href="https://codepen.io" target="_blank">C<i class="fab fa-codepen"></i>DEPEN</a>
      </div>
      <div id="nav-content">
        <div class="nav-button"><i class="fas fa-palette"></i><span>Your Work</span></div>
        <div class="nav-button"><i class="fas fa-images"></i><span>Assets</span></div>
        <div class="nav-button"><i class="fas fa-thumbtack"></i><span>Pinned Items</span></div>
        <hr/>
        <div class="nav-button"><i class="fas fa-heart"></i><span>Following</span></div>
        <div class="nav-button"><i class="fas fa-chart-line"></i><span>Trending</span></div>
        <div class="nav-button"><i class="fas fa-fire"></i><span>Challenges</span></div>
        <div class="nav-button"><i class="fas fa-magic"></i><span>Spark</span></div>
        <div id="nav-content-highlight"></div>
      </div>
    </div>
  )
}

export default navbar