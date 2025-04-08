export type Node<T> = {
  data: T;
  priority: number;
};

export class PriorityQueue<T = unknown> {
  nodes: Node<T>[] = [];

  /**
   * Adds a value to the queue with given priority.
   * Higher priority values are dequeued first.
   * If priority already exists, first one in is dequeued first.
   */
  enqueue(value: T, priority: number): void {
    const newNode: Node<T> = { data: value, priority };
    const index = this.nodes.findIndex((node) => node.priority < priority);

    if (index === -1) {
      this.nodes.push(newNode);
    } else {
      this.nodes.splice(index, 0, newNode);
    }
  }

  /**
   * Removes and returns highest priority value in the queue.
   * Returns `undefined` if queue is empty.
   */
  dequeue(): T | undefined {
    const node = this.nodes.shift();
    return node?.data;
  }

  /**
   * Returns highest priority value in the queue without removing it.
   * Returns `undefined` if queue is empty.
   */
  peek(): T | undefined {
    return this.nodes[0]?.data;
  }
}
