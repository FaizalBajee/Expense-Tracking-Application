import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection | null = null;
  private db: SQLiteDBConnection | null = null;
  private readonly dbName = 'financeDB';

  constructor() {
    // this.initializeSQLite();
  }

  private async initializeSQLite() {
    try {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
    } catch (error) {
      console.error('Error initializing SQLiteConnection:', error);
    }
  }

  async closeDatabaseConnection(): Promise<void> {
    try {
      if (this.db) {
        await this.sqlite?.closeConnection(this.dbName, true);
        console.log(`Database "${this.dbName}" connection closed`);
        this.db = null;
      }
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }


  async createDatabaseConnection(): Promise<SQLiteDBConnection | null> {
    try {
      if (!this.sqlite) {
        console.error('SQLiteConnection is not initialized');
        return null;
      }

      const db: SQLiteDBConnection = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        1,
        true
      );
      await db.open(); // Ensure the database connection is opened
      console.log(`Database connection to "${this.dbName}" established`);
      this.db = db;
      // Create tables
      await this.createTables();
      return db; // Return the connection

    } catch (error) {
      console.error('Error creating database connection:', error);
      throw error; // Propagate error
    }
  }


  private async createTables() {
    if (!this.db) return;

    const incomeTable = `
      CREATE TABLE IF NOT EXISTS Income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
    `;

    const spendingTable = `
      CREATE TABLE IF NOT EXISTS Spending (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
    `;

    const monthlySummaryTable = `
      CREATE TABLE IF NOT EXISTS MonthlySummary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT NOT NULL,
        total_income REAL DEFAULT 0,
        total_spending REAL DEFAULT 0,
        balance REAL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
    `;

    const balanceTable = `
      CREATE TABLE IF NOT EXISTS Balance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        income REAL DEFAULT 0,
        spending REAL DEFAULT 0,
        balance REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
    `;

    try {
      await this.db.execute(incomeTable);
      await this.db.execute(spendingTable);
      await this.db.execute(monthlySummaryTable);
      await this.db.execute(balanceTable);
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  //   private isDbInitialized(): boolean {
  //     if (!this.db) {
  //         console.error('Database not initialized');
  //         return false;
  //     }
  //     return true;
  // }


  // async executeQuery(query: string, values: any[] = []) {
  //   if (!this.db) {
  //     console.error('Database not initialized');
  //     return;
  //   }
  //   try {
  //     return await this.db.run(query, values);
  //   } catch (error) {
  //     console.error('Error executing query:', error);
  //   }
  // }

  async updateBalance(date: string, income: number = 0, spending: number = 0) {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }

    const query = `
      INSERT INTO Balance (date, income, spending, balance)
      VALUES (?, ?, ?, (
        SELECT COALESCE(SUM(income) - SUM(spending), 0) 
        FROM Balance
      ) + ? - ?);
    `;

    try {
      await this.db.run(query, [date, income, spending, income, spending]);
      console.log('Balance updated successfully');
    } catch (error) {
      console.error('Error updating balance:', error);
    }
  }

  ///////////////

  async addIncome(category: string, amount: number, date: string): Promise<void> {
    if (!this.db) {
      console.error('Database not initialized');
      return;
    }

    const query = `
      INSERT INTO Income (category, amount, date)
      VALUES (?, ?, ?);
    `;

    try {
      await this.db.run(query, [category, amount, date]);
      console.log('Income record added successfully');
    } catch (error) {
      console.error('Error inserting data into Income table:', error);
    }
  }

}
