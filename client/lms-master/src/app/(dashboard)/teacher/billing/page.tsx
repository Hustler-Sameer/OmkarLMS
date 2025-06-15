"use client"
import Loading from "@/components/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { useGetTransactionsQuery } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import { SelectValue } from "@radix-ui/react-select";
import React, { useState } from "react";

const TeacherBilling = () => {
  const [paymentType, setPaymentType] = useState("all");
  const { user, isLoaded } = useUser();
  const { data: transactions, isLoading: isLoadingTransactions } =
    useGetTransactionsQuery(user?.id || "", {
      skip: !isLoaded || !user,
    });
  // we can skip to call api request untill user is loaded , this is a feature of redux toolkit query
  const filteredData =
    transactions?.filter((transactions) => {
      const matchesTypes =
        paymentType === "all" || transactions.paymentProvider === paymentType;
      return matchesTypes;
    }) || [];
  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please signin to view your billing information</div>;
  return (
    <div className="billing">
      <div className="billing__container">
        <h2 className="billing__title">Payment History</h2>
        <div className="billing__filters">
          <Select value={paymentType} onValueChange={setPaymentType}>
            <SelectTrigger className="billing__select">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent className="billing__select-content">
              <SelectItem className="billing_select-item" value="all">
                All Types
              </SelectItem>
              <SelectItem className="billing_select-item" value="stripe">
                Stripe
              </SelectItem>
              <SelectItem className="billing_select-item" value="razorpay">
                Razorpay
              </SelectItem>
            </SelectContent>
          </Select>
         
        </div>
         <div className="billing__grid">
            {isLoadingTransactions ? (
              <Loading />
            ) : (
              <Table className="billing_table">
                <TableHeader className="billing__table-header">
                  <TableRow className="billing__table-header-row">
                    <TableHead className="billing__table-cell">Date</TableHead>
                    <TableHead className="billing__table-cell">
                      Amount
                    </TableHead>
                    <TableHead className="billing__table-cell">
                      Payment Method
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="billing__table-body">
                  {filteredData.length > 0 ? (
                    filteredData.map((transactions) => (
                      <TableRow
                        className="billing__table-row"
                        key={transactions.transactionId}
                      >
                        <TableCell className="billing__table-cell">
                          {new Date(transactions.dateTime).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="billing__table-cell billing__amount">
                          {formatPrice(transactions.amount)}
                        </TableCell>
                        <TableCell className="billing__table-cell">
                          {transactions.paymentProvider}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="billing__table-row">
                      <TableCell
                        className="billing__table-cell text-center"
                        colSpan={3}
                      >
                        No transactions to display
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
      </div>
    </div>
  );
};

export default TeacherBilling;
