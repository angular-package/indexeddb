

type Status = 'log' | 'info' | 'warn' | 'error';

export class ConsoleLog<Group extends string> {
  #group?: Group;

  /**
   * 
   * @param group 
   */
  constructor(group?: Group) {
    this.#group = group;
  }

  /**
   * 
   * @param group 
   * @returns 
   */
  public group(group?: Group) {
    this.#group = group;
    return this;
  }

  /**
   * 
   * @param method 
   * @param actions 
   * @param status 
   */
  public log(
    actions: { status?: Status, name: string, value: any }[],
    status: string | {[K in Status]?: string} = `Completed`
  ) {
    this.#group && console.group(this.#group);
    actions.forEach(action => this.display(action));
    this.display(status);
    this.#group && console.groupEnd();
  }

  /**
   * 
   * @param log 
   * @param def 
   */
  public display(
    log: string | {[K in Status]?: string} | { status?: Status, name: string, value: any },
    def?: Status
  ) {
    if (typeof log === 'object') {
      if ('name' in log) {
        if (log.status) {
          console[log.status](log.name, log.value);
        } else {
          if (def) {
            console[def](log.name, log.value);;
          } else {
            console.log(log.name, log.value);
          }
        }
      } else {
        if (log.error) {
          console.error(log.error);
        } else if (log.warn) {
          console.error(log.warn);
        } else if (log.info) {
          console.info(log.info);
        } else if (log.log) {
          console.log(log.log);
        }    
      }
    } else {
      console.log(log);
    }
  }
}
