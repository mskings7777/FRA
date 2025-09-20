import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import KeyMetricsChart from '../components/KeyMetricsChart';
import PieChartDisplay from '../components/PieChartDisplay';
import mpForest from "../imgs/Forests_map/StatewiseMap/mpForest.png"

const containerStyle = {
  width: '30vw',
  height: '55vh',
  borderRadius: '9999px',
};

const center = {
  lat: 78.9629,
  lng: 20.5937,
  zIndex: 40
};

const mapStyles = [
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      { "color": "#e9e9e9" },
      { "lightness": 17 }
    ]
  },
  {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [
      { "color": "#f5f5f5" },
      { "lightness": 20 }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#ffffff" },
      { "lightness": 17 }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#ffffff" },
      { "lightness": 17 }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [
      { "color": "#ffffff" },
      { "lightness": 16 }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  }
];

export default function Main() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCbPuQtQHdpdAu5DiLHQaoxEPc85PuNjTs" // Replace with your actual API key
  });

  const mapOptions = {
    styles: mapStyles
  };

  const barData = {
    forestArea: 1200,
    population: 56000,
    individualClaims: 250,
  };

  const pieData = [
    { name: "Forest Cover", value: 25.11, color: "#2E7D32" },
    { name: "Non-Forest", value: 100 - 25.11, color: "#E8F5E8" },
  ];


  return isLoaded ? (
    <div className='relative w-screen h-screen bg-green-white'>
        <div className='flex space-x-10 pt-14.5 px-5'>
            <div className='py-20 object-cover space-y-5 px-5 rounded-lg'>
                <div className='text-4xl flex justify-center pt-7 text-green-900'>Interactive Map </div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={4}
                    mapTypeId="satellite"
                    options={{
                        styles: [
                        {
                            elementType: "geometry",
                            stylers: [{ color: "#f5f5f5" }]
                        },
                        {
                            elementType: "labels.icon",
                            stylers: [{ visibility: "off" }]
                        },
                        {
                            elementType: "labels.text.fill",
                            stylers: [{ color: "#616161" }]
                        },
                        {
                            elementType: "labels.text.stroke",
                            stylers: [{ color: "#f5f5f5" }]
                        },
                        {
                            featureType: "water",
                            elementType: "geometry",
                            stylers: [{ color: "#c9c9c9" }]
                        }
                    ]
                    }}
                    >
                </GoogleMap>
            </div>
            <div className='w-screen text-green-900 '>
                <div className='shadow-2xl mt-20 bg-white mx-5 px-5 py-8 rounded-lg space-y-5'>
                    <div className='text-3xl'>Location Selection</div>
                    <div className='space-y-3'>
                        <div>
                            <div className='text-xl text-bold'>State</div>
                            <input type="text" className='w-full bg-zinc-100 border-2 border-zinc-400 rounded-md' />
                        </div>
                        <div>
                            <div className='text-xl text-bold'>District</div>
                            <input type="text" className='w-full bg-zinc-100 border-2 border-zinc-400 rounded-md' />
                        </div>
                        <div>
                            <div className='text-xl text-bold'>Village</div>
                            <input type="text" className='w-full bg-zinc-100 border-2 border-zinc-400 rounded-md' />
                        </div>
                    </div>
                </div>

                <div className='shadow-2xl mt-6 bg-white mx-5 px-5 py-2 rounded-lg space-y-5'>
                    <div className='text-3xl text-green-900'>Balaghat, Madhya Pradesh</div>
                    <div className='space-y-3'>
                    <div className='flex space-x-10'>
                      <div className='flex space-x-5 bg-zinc-100 rounded-xl p-5'>
                          <div className=' px-'>
                              <div>Forest Area</div>
                              <div>52,000 sq km</div>
                          </div>
                          <div><img className='w-7 h-7' src="https://cdn-icons-png.flaticon.com/128/735/735331.png" alt="" /></div>
                      </div>
                      <div className='flex space-x-5 bg-zinc-100 rounded-xl p-5'>
                          <div className=' px-'>
                              <div>Forest Area</div>
                              <div>52,000 sq km</div>
                          </div>
                          <div><img className='w-7 h-7' src="https://cdn-icons-png.flaticon.com/128/735/735331.png" alt="" /></div>
                      </div>
                      <div className='flex space-x-5 bg-zinc-100 rounded-xl p-5'>
                          <div className=' px-'>
                              <div>Forest Area</div>
                              <div>52,000 sq km</div>
                          </div>
                          <div><img className='w-7 h-7' src="https://cdn-icons-png.flaticon.com/128/735/735331.png" alt="" /></div>
                      </div>

                      </div>

                      <div className='flex space-x-10'>
                      <div className='flex space-x-5 bg-zinc-100 rounded-xl p-5'>
                          <div className=' px-'>
                              <div>Forest Area</div>
                              <div>52,000 sq km</div>
                          </div>
                          <div><img className='w-7 h-7' src="https://cdn-icons-png.flaticon.com/128/735/735331.png" alt="" /></div>
                      </div>
                      <div className='flex space-x-5 bg-zinc-100 rounded-xl p-5'>
                          <div className=' px-'>
                              <div>Forest Area</div>
                              <div>52,000 sq km</div>
                          </div>
                          <div><img className='w-7 h-7' src="https://cdn-icons-png.flaticon.com/128/735/735331.png" alt="" /></div>
                      </div>
                      <div className='flex space-x-5 bg-zinc-100 rounded-xl p-5'>
                          <div className=' px-'>
                              <div>Forest Area</div>
                              <div>52,000 sq km</div>
                          </div>
                          <div><img className='w-7 h-7' src="https://cdn-icons-png.flaticon.com/128/735/735331.png" alt="" /></div>
                      </div>
                      
                      </div>
                        
                    </div>
                </div>

            </div>
        </div>
        <div className='bg-zinc-50 mt-5 pt-5'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 shadow-2xl w-[80vw] mt-10 bg-white mx-auto px-5 py-5 rounded-lg '>
            <div className='space-y-5 w-[60vw]'>
                <div className='text-3xl'>Bar Chart</div>
                    <div className=''>
                       <KeyMetricsChart data={barData} />
                </div>
            </div>

            <div className='space-y-5'>
                <div className='text-3xl'>Pie Chart</div>
                    <div className=''>
                       <PieChartDisplay data={pieData} />
                </div>
            </div>

          </div>

          <div className='shadow-2xl w-[80vw] mt-10 bg-white mx-auto py-5 rounded-lg flex justify-center'>
            <div className='grid grid-cols-1 lg:grid-cols-2 space-x-20'>  
              <img className='w-auto h-96' src={mpForest} alt="" />
              <img className='w-auto h-96' src={mpForest} alt="" />
            </div>
          </div>

        </div>
    </div>
  ) : <p>Loading map...</p>;
}

