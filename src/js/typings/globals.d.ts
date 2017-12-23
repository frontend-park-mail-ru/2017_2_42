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

declare namespace Auth {
  interface UserLoginData {
    username: string;
    password: string;
  }

  interface UserSignUpData {
    username: string;
    email: string;
    password: string;
  }
}


declare namespace Application {
  interface App {
    start(): void;

    stop(): void;

    pause(): void;

    resume(): void;
  }

}

declare namespace HttpNS {
  interface Response {
    readonly statusCode?: number;
    readonly errorType?: 'CONN_ERR' | 'JSON_ERR';
    readonly body?: any;
  }
}

declare namespace Map {
  interface Meta {
    id: number;
    name: string;
    level: number;
    timer: number;
    rating: number;
    created: string;
    preview: string;
    players: number;
    playedTimes: number;
  }
}

