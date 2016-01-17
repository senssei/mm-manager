export class Comparable {
  compareTo(other) {
    return (other instanceof Comparable) ? -1 : 0;
  }
}