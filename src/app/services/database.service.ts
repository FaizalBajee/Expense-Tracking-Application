import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection | null = null;
  private db: SQLiteDBConnection | null = null;
  private readonly dbName = 'financeDB';

  constructor() {
    // Initialize SQLite when the service is created
    // this.initializeSQLite();
  }

  /**
   * Initialize SQLite Connection
   */
  async initializeSQLite() {
    try {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
      this.createDatabaseConnection();
      console.log("Successfully initializeSQLite")
    } catch (error) {
      console.error('Error initializing SQLiteConnection:', error);
    }
  }

  /**
   * Create Database Connection
   */
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
        false
      );
      await db.open();
      console.log(`Database connection to "${this.dbName}" established`);
      this.db = db;

      // Create tables
      await this.createTables();
      return db;
    } catch (error) {
      console.error('1111Error creating database connection:', error);
      throw error;
    }
  }

  /**
   * Close Database Connection
   */
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

  /**
   * Create Tables in the Database
   */
  private async createTables() {
    if (!this.db) return;

    const queries = [
      `
      CREATE TABLE IF NOT EXISTS Income (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
      `,
      `
      CREATE TABLE IF NOT EXISTS Spending (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        amount REAL NOT NULL,
        date TEXT NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
      `,
      `
      CREATE TABLE IF NOT EXISTS MonthlySummary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        month TEXT NOT NULL,
        total_income REAL DEFAULT 0,
        total_spending REAL DEFAULT 0,
        balance REAL DEFAULT 0,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
      `,
      `
      CREATE TABLE IF NOT EXISTS Balance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        income REAL DEFAULT 0,
        spending REAL DEFAULT 0,
        balance REAL NOT NULL,
        createdAt TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );
      `
    ];

    try {
      for (const query of queries) {
        await this.db.execute(query);
      }
      console.log('Tables created successfully');
    } catch (error) {
      console.error('22222 Error creating tables:', error);
    }
  }

  /**
   * Add Income Record
   */
 
  addIncome(category: string, amount: number, date: string): Observable<{ message: string }> {
    return new Observable<{ message: string }>((observer) => {
      if (!this.db) {
        console.error('Database not initialized');
        observer.error({ message: 'Database not initialized' });
        return;
      }

      const query = `
            INSERT INTO Income (category, amount, date)
            VALUES (?, ?, ?);
        `;

      this.db
        .run(query, [category, amount, date])
        .then(() => {
          observer.next({ message: 'Income record added successfully' });
          observer.complete();
        })
        .catch((error) => {
          console.error('Error inserting data into Income table:', error);
          observer.error({ message: 'Error inserting data', error });
        });
    }).pipe(
      tap((response) => console.log(response.message))
    );
  }

  // Add spending records
  addSpending(category: string, amount: number, date: string): Observable<{ message: string }> {
    return new Observable<{ message: string }>((observer) => {
      if (!this.db) {
        console.error('Database not initialized');
        observer.error({ message: 'Database not initialized' });
        return;
      }

      const query = `
            INSERT INTO Spending (category, amount, date)
            VALUES (?, ?, ?);
        `;

      this.db
        .run(query, [category, amount, date])
        .then(() => {
          observer.next({ message: 'Spending record added successfully' });
          observer.complete();
        })
        .catch((error) => {
          console.error('Error inserting data into spending table:', error);
          observer.error({ message: 'Error inserting data', error });
        });
    }).pipe(
      tap((response) => console.log(response.message))
    );
  }

  // getIncome
  
  getTotalIncome(): Observable<{ total: number }> {
    return new Observable<{ total: number }>((observer) => {
      if (!this.db) {
        console.error('Database not initialized');
        observer.error({ total: 0 });
        return;
      }
  
      const query = `SELECT SUM(amount) AS total FROM Income;`;
  
      this.db
        .query(query)
        .then((result) => {
          const totalIncome = result.values?.[0]?.total || 0;
          observer.next({ total: totalIncome });
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching total income:', error);
          observer.error({ total: 0 });
        });
    }).pipe(
      tap((response) => console.log('Total Income:', response.total))
    );
  }

  // getSpending

  getTotalSpending(): Observable<{ total: number }> {
    return new Observable<{ total: number }>((observer) => {
      if (!this.db) {
        console.error('Database not initialized');
        observer.error({ total: 0 });
        return;
      }
  
      const query = `SELECT SUM(amount) AS total FROM Spending;`;
  
      this.db
        .query(query)
        .then((result) => {
          const totalSpending = result.values?.[0]?.total || 0;
          observer.next({ total: totalSpending });
          observer.complete();
        })
        .catch((error) => {
          console.error('Error fetching total spending:', error);
          observer.error({ total: 0 });
        });
    }).pipe(
      tap((response) => console.log('Total spending:', response.total))
    );
  }
  


  /**
   * Update Balance
   */
 
  updateBalance(date: string, income: number = 0, spending: number = 0): Observable<{ message: string }> {
    return new Observable<{ message: string }>((observer) => {
      if (!this.db) {
        console.error('Database not initialized');
        observer.error({ message: 'Database not initialized' });
        return;
      }

      const query = `
        INSERT INTO Balance (date, income, spending, balance)
        VALUES (?, ?, ?, (
          SELECT COALESCE(SUM(income) - SUM(spending), 0) 
          FROM Balance
        ) + ? - ?);
      `;

      this.db.run(query, [date, income, spending, income, spending])
        .then(() => {
          observer.next({ message: 'Balance updated successfully' });
          observer.complete();
        })
        .catch((error) => {
          console.error('Error updating balance:', error);
          observer.error({ message: 'Error updating balance', error });
        });
    }).pipe(
      tap((response) => console.log(response.message))
    );
  }


}
