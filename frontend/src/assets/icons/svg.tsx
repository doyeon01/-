
export function CloseIcon(): JSX.Element {
  return (
    <svg
      className="w-3 h-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
      />
    </svg>
  );
}

export function UserIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-[150px] h-[150px] text-[#645E59]"  
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        clipRule="evenodd"
    />
    </svg>

  );
}

export function UserIconMini(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-[50px] h-[50px] text-wight"  
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
        clipRule="evenodd"
    />
    </svg>

  );
}
export function FeedIcon({ active }: { active: boolean }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#645E59" : "rgba(100, 94, 89, 0.5)"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-grid"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}


export function LikeIcon({ active }: { active: boolean }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill={active ? "#645E59" : "rgba(100, 94, 89, 0.5)"}
      className="size-6"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/>
    </svg>
  );
}

export function RouteIcon({ active }: { active: boolean }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? "#645E59" : "rgba(100, 94, 89, 0.5)"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="size-6"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

export function UsersIcon({ active }: { active: boolean }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      fill={active ? "#645E59" : "rgba(100, 94, 89, 0.5)"}
    >
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" />
    </svg>
  );
}



export function CameraIcon({ active }: { active: boolean }): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 16 16"
      fill={active ? "#645E59" : "rgba(100, 94, 89, 0.5)"}
    >
      <g fill="currentColor">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" />
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0" />
      </g>
    </svg>
  );
}


export function RedHeartIcon(): JSX.Element {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <path 
        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
      />
    </svg>
  );
}

export function RealHeartIcon(): JSX.Element {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="#707C60" 
    >
      <path 
        d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"
      />
    </svg>
  );
}


export function SearchIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 512 512"
      fill="none"
      stroke="#B6AFA9"  
      strokeLinecap="round"
      strokeMiterlimit="10"
      strokeWidth="64"
    >
      <path d="M221.09 64a157.09 157.09 0 1 0 157.09 157.09A157.1 157.1 0 0 0 221.09 64Z"/>
      <path d="M338.29 338.29L448 448"/>
    </svg>
  );
}


export function PictureIcon(): JSX.Element {
  return (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="10em"
     height="10em"
     viewBox="0 0 32 24"
     >
    <path fill="#645E59" d="M0 0h32v24H0zm2 2v20h28V2zm2.012 18.054S6.092 6.008 9.181 6.008s4.442 9.908 6.926 9.908s2.298-3.871 4.116-3.871s8.08 8.01 8.08 8.01zM25 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6"/>
    </svg>

  );
}

export function LocationIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#878787"
        strokeLinecap="round" 
        strokeLinejoin="round"  
        strokeWidth="2"  
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8" />
      </g>
    </svg>
  );
}

export function LocationDetailIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3em"
      height="3em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#878787"
        strokeLinecap="round" 
        strokeLinejoin="round"  
        strokeWidth="2"  
      >
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8" />
      </g>
    </svg>
  );
}
export function BackIcon(): JSX.Element {
  return (
    <svg
     xmlns="http://www.w3.org/2000/svg"
     width="2em"
     height="2em"
     viewBox="0 0 12 24">
      <path fill="currentColor" fillRule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"/>
    </svg>
  );
}

export function FoodIcon(): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg"
     width="2.5em"
     height="2.5em"
     viewBox="0 0 256 256">
      <path fill="#645E59" d="M68 88V40a12 12 0 0 1 24 0v48a12 12 0 0 1-24 0m152-48v184a12 12 0 0 1-24 0v-44h-44a12 12 0 0 1-12-12a273.2 273.2 0 0 1 7.33-57.82c10.09-41.76 29.43-69.85 55.94-81.18A12 12 0 0 1 220 40m-24 22.92C182.6 77 175 98 170.77 115.38a254.4 254.4 0 0 0-6.22 40.62H196ZM128 39a12 12 0 0 0-24 2l4 47.46a28 28 0 0 1-56 0L56 41a12 12 0 1 0-24-2l-4 48v1a52.1 52.1 0 0 0 40 50.59V224a12 12 0 0 0 24 0v-85.41A52.1 52.1 0 0 0 132 88v-1Z"/>
    </svg>
  )
}

export function PlaceIcon(): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg"
     width="2.5em"
     height="2.5em"
     viewBox="0 0 24 24">
    <path fill="#645E59" d="M8.21 17c.44-.85.85-1.84 1.23-3H9v-2h1c.61-2.6 1-5.87 1-10h2c0 4.13.4 7.4 1 10h1v2h-.44c.38 1.16.79 2.15 1.23 3H17v2l2 3h-2.42c-.77-1.76-2.53-3-4.58-3s-3.81 1.24-4.58 3H5l2-3l-.03-2zm4.38-3h-1.18a22 22 0 0 1-1.13 3h3.44c-.4-.87-.79-1.87-1.13-3"/>
    </svg>
  )
}

export function CafeIcon(): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg"
     width="2.5em"
     height="2.5em"
     viewBox="0 0 20 20">
    <g fill="#645E59"><path fill-rule="evenodd" d="M15.5 4h-12a1 1 0 0 0-1 1c0 4.918 3.061 9 7 9s7-4.082 7-9a1 1 0 0 0-1-1m-6 8c-2.455 0-4.596-2.57-4.949-6h9.898c-.353 3.43-2.494 6-4.949 6" clip-rule="evenodd"/><path d="M4 14.5h11a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2m10.024-3.69l.552-1.923c.257.074.539.113.831.113c1.107 0 1.893-.543 1.893-1s-.786-1-1.893-1V5C17.495 5 19.3 6.248 19.3 8s-1.805 3-3.893 3c-.477 0-.944-.065-1.383-.19"/></g></svg>
  )
}

export function HotelIcon(): JSX.Element {
  return(
    <svg xmlns="http://www.w3.org/2000/svg"
     width="2.5em"
     height="2e.5m"
     viewBox="0 0 24 24">
    <path fill="#645E59" d="M11.336 2.253a1 1 0 0 1 1.328 0l9 8a1 1 0 0 1-1.328 1.494L20 11.45V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.55l-.336.297a1 1 0 0 1-1.328-1.494zM6 9.67V19h3v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5h3V9.671l-6-5.333zM13 19v-4h-2v4z"/>
    </svg>
  )
}


export function DownLoadIcon(): JSX.Element {
  return(
    <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="2em" 
    height="2em" 
    viewBox="0 0 24 24">
    <path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"/>
    </svg>
  )
}