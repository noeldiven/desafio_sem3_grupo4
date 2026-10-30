import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  tieneError: boolean;
  error: Error | null;
}

// TODO [D]: error boundary (solo existe como componente de clase)
// - getDerivedStateFromError: guardar { tieneError: true, error }
// - componentDidCatch: console.error del error y de info.componentStack
// - si hay error: mostrar fallback o una tarjeta con el mensaje
//   y un boton "Intentar de nuevo" que limpie el state
// se puede probar en /laboratorio
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tieneError: false, error: null };
  }
  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo): void {
    console.log("Error Boundaryc capturado: ", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.tieneError) {
      return (
        this.props.fallback ?? (
          <div>
            <p>Salio mal</p>
            <p>{this.state.error?.message} </p>

            <button
              type="button"
              onClick={() => this.setState({ tieneError: false, error: null })}
            >
              Intentar de nuevo
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
