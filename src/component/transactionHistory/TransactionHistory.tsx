import { observer } from "mobx-react-lite";
import { balanceStore } from "../../store/balanceStore";
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";
import { useEffect } from "react";
import { userStore } from "../../store/userStore";
import "./transactionHistory.scss";

const TransactionHistory = observer(() => {
  useEffect(() => {
    if (userStore.user) {
      balanceStore.loadBalance(userStore.user.uid);
    }
  }, [userStore.user]);

  return (
    <Container className="transaction-container">
      <Typography variant="h4">📜 היסטוריית עסקאות</Typography>

      <Paper className="transaction-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>📅 תאריך</TableCell>
              <TableCell>💰 סכום</TableCell>
              <TableCell>🎲 סוג עסקה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balanceStore.transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  אין עסקאות להצגה
                </TableCell>
              </TableRow>
            ) : (
              balanceStore.transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.type === "win" ? "✅ זכייה" : transaction.type === "loss" ? "❌ הפסד" : "💰 טעינה"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
});

export default TransactionHistory;
