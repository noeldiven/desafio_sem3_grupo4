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
  state: State = { tieneError: false, error: null };

  // Se ejecuta durante el render cuando un hijo lanza.
  // Debe ser puro y SOLO devolver el nuevo state.
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { tieneError: true, error };
  }

  // Se ejecuta después del render del fallback: acá sí van los logs.
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error Boundary capturado: ", error);
    console.error("componentStack: ", info.componentStack);
  }

  reiniciar = () => {
    this.setState({ tieneError: false, error: null });
  };

  render() {
    if (this.state.tieneError) {
      return (
        this.props.fallback ?? (
          <div className="mx-auto max-w-xl rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800">
            <p className="text-xs font-bold uppercase tracking-wide text-rose-600">
              Algo salió mal
            </p>
            <p className="mt-2 text-sm font-semibold">
              {this.state.error?.message ?? "Error inesperado"}
            </p>
            <button
              type="button"
              onClick={this.reiniciar}
              className="mt-4 h-10 rounded-xl bg-rose-600 px-4 text-sm font-bold text-white hover:bg-rose-700"
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