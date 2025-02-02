import { Injectable } from "@angular/core";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChartService {
    private sqlite: SQLiteConnection | null = null;
    private db: SQLiteDBConnection | null = null;
    private readonly dbName = 'financeDB';

    constructor() { }

    //  Initialize SQLite Connection

    async initializeSQLite() {
        try {
            this.sqlite = new SQLiteConnection(CapacitorSQLite);
            await this.createDatabaseConnection();
            console.log("Successfully initializeSQLite")
        } catch (error) {
            console.error('Error initializing SQLiteConnection:', error);
        }
    }

    // Create Database Connection

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

    // Create Tables in the Database

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


    getFood(): Observable<{ total: number }> {
        return new Observable<{ total: number }>((observer) => {
            if (!this.db) {
                console.error('Database not initialized');
                observer.error(new Error('Database not initialized'));
                return;
            }
            const query = `SELECT SUM(amount) AS totalFood FROM Spending WHERE category = 'Food'`;

            this.db
                .query(query)
                .then((result) => {
                    const totalFood = result.values?.[0]?.total || 0;
                    observer.next({ total: totalFood });
                    observer.complete();
                })
                .catch((error) => {
                    console.error('Error fetching total spending:', error);
                    observer.error({ total: 0 });
                })
        }).pipe(
            tap((response) => console.log('Total Food:', response.total))
        )

    }

}