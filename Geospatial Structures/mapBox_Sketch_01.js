/*
 * MAPBOX TUTORIAL: Interactive New York City Map
 * ===============================================
 * 
 * This script demonstrates how to create an interactive map using Mapbox GL JS.
 * It's designed for beginners learning both JavaScript and Mapbox.
 * 
 * WHAT IS MAPBOX?
 * Mapbox is a mapping platform that provides tools to create custom maps.
 * Mapbox GL JS is a JavaScript library that renders interactive maps in web browsers.
 * 
 * PREREQUISITES:
 * - Basic understanding of HTML, CSS, and JavaScript
 * - A Mapbox access token (free at https://account.mapbox.com/access-tokens/)
 * - Mapbox GL JS library loaded in your HTML
 */

// Wrap everything in a function to maintain independence from other scripts
var mapboxSketch = function() {
  // ============================================================================
  // STEP 1: SET UP YOUR MAPBOX ACCESS TOKEN
  // ============================================================================
  // An access token is like a password that lets you use Mapbox services.
  // You need to get a free token from Mapbox's website.
  // Replace this with your own token!
  mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3OWl1IiwiYSI6ImNtZDZuMDZqcTBidm0yam9jNGw5ZGVyNXMifQ.Md4YXh31utp86Gcx-uDpAA'; // Replace with your own token <---------------------------------------------------------------------------------------------

  // ============================================================================
  // STEP 2: CREATE THE MAP OBJECT
  // ============================================================================
  // The 'new' keyword creates a new instance of the Mapbox Map class.
  // This is like creating a new object that represents your map.
  const map = new mapboxgl.Map({
      // 'container' tells Mapbox which HTML element to put the map in
      // This should match the 'id' of a div in your HTML
      container: 'mapbox-container-1',
      
      // 'style' determines how your map looks
      // Mapbox provides several pre-made styles:
      // - 'light-v11': Clean, minimal style (what we're using)
      // - 'streets-v12': Standard street map
      // - 'satellite-v9': Satellite imagery
      // - 'dark-v11': Dark theme
      style: 'mapbox://styles/mapbox/light-v11',
      
      // 'center' sets where the map is centered when it first loads
      // Format: [longitude, latitude] (note: longitude comes first!)
      // These coordinates are for New York City
      center: [-74.006, 40.7128],
      
      // 'zoom' sets how close or far the map is zoomed
      // Higher numbers = more zoomed in (closer to the ground)
      // Typical range: 0 (world view) to 22 (building level)
      zoom: 11,
      
      // 'pitch' tilts the map for a 3D effect
      // 0 = flat (top-down view), 60 = maximum tilt
      // We're using 0 for a clean, minimal look
      pitch: 0,
      
      // 'bearing' rotates the map
      // 0 = north at the top, 90 = east at the top, etc.
      bearing: 0
  });

  // ============================================================================
  // STEP 3: ADD MAP CONTROLS
  // ============================================================================
  // Controls are UI elements that let users interact with the map

  // Navigation control: adds zoom in/out buttons and a compass
  // 'top-right' positions it in the top-right corner of the map
  map.addControl(new mapboxgl.NavigationControl(), 'top-right');

  // Fullscreen control: adds a button to make the map fullscreen
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right');

  // Scale control: shows the map scale (how many meters/pixels)
  // This helps users understand distances on the map
  map.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,        // Maximum width of the scale bar
      unit: 'metric'       // Use meters/kilometers instead of feet/miles
  }), 'bottom-left');

  // ============================================================================
  // STEP 4: WAIT FOR THE MAP TO LOAD
  // ============================================================================
  // Maps load asynchronously (in the background), so we need to wait
  // before we can add things like markers to it.
  // The 'load' event fires when the map is ready to use.
  map.on('load', () => {
      // This code only runs after the map has finished loading
      console.log('Map loaded successfully!');
      
      // ========================================================================
      // STEP 5: ADD MARKERS TO THE MAP
      // ========================================================================
      // Markers are pins that you can place on the map to highlight locations
      
      // Times Square Marker
      const timesSquareMarker = new mapboxgl.Marker({
          color: '#666',    // Color of the marker (gray)
          scale: 1.0        // Size of the marker (1.0 = normal size)
      })
      .setLngLat([-73.9855, 40.7580])  // Set the marker's position
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Times Square</h3><p>The heart of Manhattan!</p>'))
      .addTo(map);  // Actually place the marker on the map
      
      // Central Park Marker
      const centralParkMarker = new mapboxgl.Marker({
          color: '#666',
          scale: 1.0
      })
      .setLngLat([-73.9654, 40.7829])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Central Park</h3><p>843 acres of urban oasis</p>'))
      .addTo(map);
      
      // Brooklyn Bridge Marker
      const brooklynBridgeMarker = new mapboxgl.Marker({
          color: '#666',
          scale: 1.0
      })
      .setLngLat([-73.9969, 40.7061])
      .setPopup(new mapboxgl.Popup().setHTML('<h3>Brooklyn Bridge</h3><p>Iconic bridge connecting Manhattan and Brooklyn</p>'))
      .addTo(map);
  });

  // ============================================================================
  // STEP 6: ADD CUSTOM BUTTON FUNCTIONALITY
  // ============================================================================
  // These functions connect our HTML buttons to map actions

  // When the "Zoom In" button is clicked, zoom the map in
  document.getElementById('zoomIn').addEventListener('click', () => {
      map.zoomIn();  // This is a built-in Mapbox method
  });

  // When the "Zoom Out" button is clicked, zoom the map out
  document.getElementById('zoomOut').addEventListener('click', () => {
      map.zoomOut();
  });

  // When the "Reset View" button is clicked, fly back to the original view
  document.getElementById('resetView').addEventListener('click', () => {
      // 'flyTo' smoothly animates the map to a new position
      map.flyTo({
          center: [-74.006, 40.7128],  // Where to center the map
          zoom: 11,                    // What zoom level
          pitch: 0,                    // What tilt angle
          bearing: 0,                  // What rotation
          duration: 2000               // How long the animation takes (in milliseconds)
      });
  });

  // ============================================================================
  // STEP 7: ADD INTERACTIVE FEATURES
  // ============================================================================
  // These features respond to user actions on the map

  // When someone clicks anywhere on the map, show the coordinates
  map.on('click', (e) => {
      // 'e' is the event object that contains information about the click
      const coordinates = e.lngLat;  // Get the coordinates where they clicked
      
      // Log the coordinates to the browser console (for debugging)
      console.log(`Clicked at: ${coordinates.lng}, ${coordinates.lat}`);
      
      // Create a popup that shows the coordinates
      new mapboxgl.Popup()
          .setLngLat(coordinates)  // Position the popup where they clicked
          .setHTML(`
              <div style="text-align: center;">
                  <h4>Location Info</h4>
                  <p><strong>Longitude:</strong> ${coordinates.lng.toFixed(4)}</p>
                  <p><strong>Latitude:</strong> ${coordinates.lat.toFixed(4)}</p>
              </div>
          `)
          .addTo(map);
  });

  // ============================================================================
  // STEP 8: ADD HOVER EFFECTS
  // ============================================================================
  // Change the cursor when hovering over markers

  // When the mouse enters a marker area, change cursor to pointer
  map.on('mouseenter', 'marker', () => {
      map.getCanvas().style.cursor = 'pointer';
  });

  // When the mouse leaves a marker area, change cursor back to default
  map.on('mouseleave', 'marker', () => {
      map.getCanvas().style.cursor = '';
  });

  // ============================================================================
  // STEP 9: ADD KEYBOARD SHORTCUTS
  // ============================================================================
  // Let users control the map with keyboard keys

  // Listen for keyboard events on the entire document
  document.addEventListener('keydown', (e) => {
      // 'e.key' tells us which key was pressed
      switch(e.key) {
          case '+':
          case '=':
              e.preventDefault();  // Prevent the default browser behavior
              map.zoomIn();
              break;
          case '-':
              e.preventDefault();
              map.zoomOut();
              break;
          case 'r':
          case 'R':
              e.preventDefault();
              document.getElementById('resetView').click();  // Trigger the reset button
              break;
      }
  });

  // ============================================================================
  // STEP 10: DEBUGGING AND CONSOLE OUTPUT
  // ============================================================================
  // These console.log statements help with debugging and learning

  console.log('Mapbox NYC Map initialized');
  console.log('Available map styles:');
  console.log('- mapbox://styles/mapbox/light-v11 (current)');
  console.log('- mapbox://styles/mapbox/streets-v12');
  console.log('- mapbox://styles/mapbox/satellite-v9');
  console.log('- mapbox://styles/mapbox/dark-v11');
  console.log('- mapbox://styles/mapbox/outdoors-v12');

  /*
   * NEXT STEPS FOR LEARNING:
   * ========================
   * 
   * 1. Try changing the map style to see different looks
   * 2. Add more markers for other NYC locations
   * 3. Experiment with different zoom levels and center coordinates
   * 4. Add custom data layers (GeoJSON files)
   * 5. Implement search functionality
   * 6. Add routing between points
   * 7. Create custom map styles using Mapbox Studio
   * 
   * USEFUL RESOURCES:
   * - Mapbox GL JS Documentation: https://docs.mapbox.com/mapbox-gl-js/
   * - Mapbox Examples: https://docs.mapbox.com/mapbox-gl-js/example/
   * - JavaScript Tutorial: https://developer.mozilla.org/en-US/docs/Web/JavaScript
   */ 
};

// Execute the sketch
mapboxSketch(); 