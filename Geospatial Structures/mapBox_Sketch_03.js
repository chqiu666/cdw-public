/*
 * MAPBOX TUTORIAL: Loading External GeoJSON Data - NYC Neighborhoods
 * ==================================================================
 * 
 * This script demonstrates how to load and visualize data from external GeoJSON files
 * using Mapbox GL JS. It shows how to:
 * - Load data from external files
 * - Automatically frame the map to fit the data
 * - Apply data-driven styling based on properties
 * - Handle different geometry types (points, lines, polygons)
 * - Create interactive features with external data
 * 
 * WHAT IS EXTERNAL DATA LOADING?
 * - Loading GeoJSON files from URLs or local files
 * - Separating data from visualization logic
 * - Enabling dynamic data updates without code changes
 * - Supporting larger datasets and real-world applications
 * 
 * PREREQUISITES:
 * - Basic understanding of HTML, CSS, and JavaScript
 * - A Mapbox access token (free at https://account.mapbox.com/access-tokens/)
 * - Mapbox GL JS library loaded in your HTML
 * - Understanding of GeoJSON format
 * - Local server setup (required for loading external files)
 */

// Wrap everything in a function to maintain independence from other scripts
var mapboxSketch03 = function() {
  // ============================================================================
  // STEP 1: SET UP YOUR MAPBOX ACCESS TOKEN
  // ============================================================================
  // Using the same token as the previous examples for consistency
  mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3OWl1IiwiYSI6ImNtZDZuMDZqcTBidm0yam9jNGw5ZGVyNXMifQ.Md4YXh31utp86Gcx-uDpAA';

  // ============================================================================
  // STEP 2: CREATE THE MAP OBJECT
  // ============================================================================
  // Using the same map configuration as the previous examples for consistency
  const map3 = new mapboxgl.Map({
      container: 'mapbox-container-3',
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // Default center (will be updated when data loads)
      zoom: 11, // Default zoom (will be updated when data loads)
      pitch: 0,
      bearing: 0
  });

  // ============================================================================
  // STEP 3: ADD MAP CONTROLS
  // ============================================================================
  map3.addControl(new mapboxgl.NavigationControl(), 'top-right');
  map3.addControl(new mapboxgl.FullscreenControl(), 'top-right');
  map3.addControl(new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'metric'
  }), 'bottom-left');

  // ============================================================================
  // STEP 4: WAIT FOR THE MAP TO LOAD
  // ============================================================================
  map3.on('load', () => {
      console.log('Map 3 loaded successfully!');
      
      // ========================================================================
      // STEP 5: LOAD EXTERNAL GEOJSON DATA
      // ========================================================================
      
      // Load the GeoJSON file using fetch API
      fetch('manhattan.geojson')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(data => {
              console.log('GeoJSON data loaded successfully:', data);
              console.log('Number of features:', data.features.length);
              console.log('First feature:', data.features[0]);
              console.log('Geometry type of first feature:', data.features[0].geometry.type);
              
              // Add the data as a source to the map
              map3.addSource('nyc-data', {
                  'type': 'geojson',
                  'data': data
              });
              
              console.log('Source added successfully');
              
              // ====================================================================
              // STEP 6: ADD LAYERS FOR DIFFERENT GEOMETRY TYPES
              // ====================================================================
              
              // Add polygon layers (Manhattan neighborhoods) - PURPLE VERSION
              map3.addLayer({
                  'id': 'neighborhoods-fill',
                  'type': 'fill',
                  'source': 'nyc-data',
                  'paint': {
                      'fill-color': '#8B5CF6', // Purple color
                      'fill-opacity': 0.6,
                      'fill-outline-color': '#4C1D95'
                  }
              });

              map3.addLayer({
                  'id': 'neighborhoods-border',
                  'type': 'line',
                  'source': 'nyc-data',
                  'paint': {
                      'line-color': '#4C1D95', // Dark purple border
                      'line-width': 2,
                      'line-opacity': 0.9
                  }
              });

              // Add neighborhood labels
              map3.addLayer({
                  'id': 'neighborhood-labels',
                  'type': 'symbol',
                  'source': 'nyc-data',
                  'layout': {
                      'text-field': ['get', 'name'],
                      'text-font': ['Open Sans Regular'],
                      'text-size': 10,
                      'text-anchor': 'center',
                      'text-allow-overlap': false,
                      'text-ignore-placement': false
                  },
                  'paint': {
                      'text-color': '#333333',
                      'text-halo-color': '#ffffff',
                      'text-halo-width': 1
                  }
              });
              
              console.log('All layers added successfully');

              // ====================================================================
              // STEP 7: AUTOMATICALLY FRAME THE MAP TO FIT THE DATA
              // ====================================================================
              
              // Calculate the bounding box of all features
              const bounds = new mapboxgl.LngLatBounds();
              
              data.features.forEach(feature => {
                  if (feature.geometry.type === 'Point') {
                      bounds.extend(feature.geometry.coordinates);
                  } else if (feature.geometry.type === 'LineString') {
                      feature.geometry.coordinates.forEach(coord => {
                          bounds.extend(coord);
                      });
                  } else if (feature.geometry.type === 'Polygon') {
                      feature.geometry.coordinates[0].forEach(coord => {
                          bounds.extend(coord);
                      });
                  } else if (feature.geometry.type === 'MultiPolygon') {
                      feature.geometry.coordinates.forEach(polygon => {
                          polygon[0].forEach(coord => {
                              bounds.extend(coord);
                          });
                      });
                  }
              });
              
              // Fit the map to the data with some padding
              map3.fitBounds(bounds, {
                  padding: 50, // Add 50px padding around the data
                  duration: 2000, // Animate the transition over 2 seconds
                  maxZoom: 15 // Don't zoom in too far
              });
              
              console.log('Map automatically framed to fit data');

              // ====================================================================
              // STEP 8: ADD INTERACTIVE FEATURES
              // ====================================================================
              
              // Add hover effects for neighborhoods
              map3.on('mouseenter', 'neighborhoods-fill', () => {
                  map3.getCanvas().style.cursor = 'pointer';
                  map3.setPaintProperty('neighborhoods-fill', 'fill-opacity', 0.9);
              });

              map3.on('mouseleave', 'neighborhoods-fill', () => {
                  map3.getCanvas().style.cursor = '';
                  map3.setPaintProperty('neighborhoods-fill', 'fill-opacity', 0.6);
              });

              // Add click events to show detailed information
              map3.on('click', 'neighborhoods-fill', (e) => {
                  const coordinates = e.lngLat;
                  const properties = e.features[0].properties;
                  
                  new mapboxgl.Popup()
                      .setLngLat(coordinates)
                      .setHTML(`
                          <div style="text-align: center;">
                              <h4>${properties.name}</h4>
                              <p><strong>Neighborhood ID:</strong> ${properties.cartodb_id}</p>
                              <p><strong>Created:</strong> ${new Date(properties.created_at).toLocaleDateString()}</p>
                              <p><strong>Last Updated:</strong> ${new Date(properties.updated_at).toLocaleDateString()}</p>
                              <p><em>Click and drag to explore Manhattan's neighborhoods</em></p>
                          </div>
                      `)
                      .addTo(map3);
              });



              // ====================================================================
              // STEP 9: ADD SEARCH FUNCTIONALITY
              // ====================================================================
              
              // Search functionality for neighborhood names
              document.getElementById('searchFeature').addEventListener('input', (e) => {
                  const searchTerm = e.target.value.toLowerCase();
                  
                  if (searchTerm === '') {
                      // Show all features
                      map3.setFilter('neighborhoods-fill', null);
                      map3.setFilter('neighborhoods-border', null);
                      map3.setFilter('neighborhood-labels', null);
                  } else {
                      // Filter by name containing search term
                      const nameFilter = ['in', searchTerm, ['downcase', ['get', 'name']]];
                      map3.setFilter('neighborhoods-fill', nameFilter);
                      map3.setFilter('neighborhoods-border', nameFilter);
                      map3.setFilter('neighborhood-labels', nameFilter);
                  }
              });

              // ====================================================================
              // STEP 10: ADD CUSTOM BUTTON FUNCTIONALITY
              // ====================================================================
              
              // Reset filters button
              document.getElementById('resetFilters').addEventListener('click', () => {
                  document.getElementById('searchFeature').value = '';
                  
                  map3.setFilter('neighborhoods-fill', null);
                  map3.setFilter('neighborhoods-border', null);
                  map3.setFilter('neighborhood-labels', null);
              });

              // Fit to data button
              document.getElementById('fitToData').addEventListener('click', () => {
                  map3.fitBounds(bounds, {
                      padding: 50,
                      duration: 2000,
                      maxZoom: 15
                  });
              });

              // ====================================================================
              // STEP 11: ADD KEYBOARD SHORTCUTS
              // ====================================================================
              
              document.addEventListener('keydown', (e) => {
                  switch(e.key) {
                      case 'f':
                      case 'F':
                          e.preventDefault();
                          document.getElementById('fitToData').click();
                          break;
                      case 'r':
                      case 'R':
                          e.preventDefault();
                          document.getElementById('resetFilters').click();
                          break;
                      case 'Escape':
                          e.preventDefault();
                          document.getElementById('searchFeature').value = '';
                          document.getElementById('searchFeature').dispatchEvent(new Event('input'));
                          break;
                  }
              });

              // ====================================================================
              // STEP 12: DEBUGGING AND CONSOLE OUTPUT
              // ====================================================================
              
              console.log('Mapbox External Data Map initialized');
              console.log('Data loaded from: manhattan.geojson');
              console.log('Features loaded:');
              console.log(`- ${data.features.filter(f => f.geometry.type === 'MultiPolygon').length} Manhattan neighborhoods`);
              console.log(`- Total features: ${data.features.length}`);
              console.log('Interactive features:');
              console.log('- Hover effects on neighborhoods');
              console.log('- Click popups with neighborhood information');
              console.log('- Search functionality for neighborhood names');
              console.log('Keyboard shortcuts:');
              console.log('- F: Fit map to data');
              console.log('- R: Reset search');
              console.log('- Escape: Clear search');

          })
          .catch(error => {
              console.error('Error loading GeoJSON data:', error);
              
              // Show error message to user
              const errorDiv = document.createElement('div');
              errorDiv.style.cssText = `
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  background: #ff4444;
                  color: white;
                  padding: 20px;
                  border-radius: 8px;
                  text-align: center;
                  z-index: 1000;
              `;
              errorDiv.innerHTML = `
                  <h3>Error Loading Data</h3>
                  <p>Could not load the GeoJSON file. Make sure you're running this on a local server.</p>
                  <p>Error: ${error.message}</p>
              `;
              document.getElementById('map3').appendChild(errorDiv);
          });
  });
};

// Execute the sketch
mapboxSketch03(); 