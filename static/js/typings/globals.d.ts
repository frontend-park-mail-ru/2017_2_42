declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

interface TemplateRenderFunc {
  (options?: any): string;
}

interface EventHandlerFunc {
  (data?: object): void;
}

interface EventHandlerRemover {
  (): void;
}

interface ListenerRemover {
  (): void;
}

interface Timer {
  minutes: number;
  seconds: number;
}
