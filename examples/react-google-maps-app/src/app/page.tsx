"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Home() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 35.682839, lng: 139.759455 }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
}
