export class DatabaseConnection {
  private isConnected: boolean = false;
  async connect(): Promise<void> {
    try {
      console.log("Connecting to database....");
      this.isConnected = true;
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database coneection failed");
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    console.log("Disconnecting from database....");
    this.isConnected = false;
    console.log("Database disconnected");
  }

  isConnectionActive(): boolean {
    return this.isConnected;
  }
}
