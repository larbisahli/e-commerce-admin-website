import { keyframes } from 'styled-components';

export const Move100 = keyframes`
  0% {
     transform: translateX(100%);
    }

  100% {
      transform: translateX(0px);
    }
`;

export const GoogleRipple = keyframes`
  from {transform: scale3d(1, 1, 1);opacity: 0.7;}
  to {transform: scale3d(50, 50, 1);opacity: 0;}
`;

export const TransRipple = keyframes`
  0% {transform: translateY(0);}
  100% {transform: translateY(-5px);}
`;

export const FadeOpacity = keyframes`
  from {opacity: 1;}
  to {opacity: 0.15;}
`;

export const ScaleOut = keyframes`
    0% {
      transform: scale(0.5);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
`;

export const ScaleIn = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }

    100% {
      transform: scale(0.8);
      opacity: 0;
    }
`;

export const CountPulse = keyframes`
    0% {
        opacity: 1;
        transform: scale3d(0.4, 0.4, 1);
    }

    80% {
        box-shadow: inset 0 0 0 2px var(--color-info-200);
        opacity: 0.1;
    }

    100% {
        box-shadow: inset 0 0 0 2px rgba(111,148,182,0.8);
        opacity: 0;
        transform: scale3d(1.2, 1.2, 1);
    }
`;

export const Move200opa = keyframes`
    0% {
       transform: translateX(200%);
       opacity: 0;
       
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Move100opa = keyframes`
    0% {
       transform: translateX(100%);
       opacity: 0;
       
    }

    100% {
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const PreloadSkeleton = keyframes`
  0% {
      background-position: -769px 0;
      }

  100% {
      background-position: 769px 0;
      }
`;

export const SectionMove = keyframes`
  0% {
        opacity: 0;
        transform: translateX(-10px);
      }

  100% {
        opacity: 1;
          transform: translateX(0px);
        }
`;

export const FadeInTr = keyframes`
  0% {
      transform: translateY(20px);
      opacity: 0;
    }

  100% {
      transform: translateY(0px);
      opacity: 1;
      }
`;

export const LoadingBarProgress = keyframes`
  0% {
    background-position: 0% 0%;
  }
  
  100% {
    background-position: -200% 0%;
    }
`;

export const SpinSpinner = keyframes`
  from {
            transform: rotate(0deg);
        }
  to {
            transform: rotate(360deg);
        }
`;

export const NotificationPulseDot = keyframes`
  0% {
    transform: scale(0.85);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(255, 82, 82, 0);
  }
  
  100% {
    transform: scale(0.85);
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
`

export const NotificationPulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
  }
  
  70% {
    box-shadow: 0 0 0 8px rgba(255, 82, 82, 0);
  }
  
  100% {
    box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
  }
`