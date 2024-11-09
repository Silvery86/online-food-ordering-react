import { useTheme } from '@emotion/react';
import { Visibility } from '@mui/icons-material';
import { Badge, Chip, IconButton } from '@mui/material';
import React from 'react'

export const StatusSwithcher = ({ status }) => {
    const theme = useTheme()
    return (
        <div>
            {(() => {
                switch (status) {
                    case "PAID":
                        return (
                            <Chip
                                label="Đã thanh toán"
                                style={{
                                    backgroundColor: theme.palette.orderColor.PAID,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                    case "OUT_FOR_DELIVERY":
                        return (
                            <Chip
                                label="Đang giao hàng"
                                style={{
                                    backgroundColor: theme.palette.orderColor.OUT_FOR_DELIVERY,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                    case "FAILED":
                        return (
                            <Chip
                                label="Chưa thanh toán"
                                style={{
                                    backgroundColor: theme.palette.orderColor.FAILED,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                    case "CANCEL":
                        return (
                            <Chip
                                label="Hủy"
                                style={{
                                    backgroundColor: theme.palette.orderColor.CANCEL,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );                  
                    case "DELIVERED":
                        return (
                            <Chip
                                label="Đã giao hàng"
                                style={{
                                    backgroundColor: theme.palette.orderColor.DELIVERED,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                    case "PENDING":
                        return (
                            <Chip
                                label="Đang thanh toán"
                                style={{
                                    backgroundColor: theme.palette.orderColor.PENDING,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                        case "PREPARED":
                        return (
                            <Chip
                                label="Đã xác nhận"
                                style={{
                                    backgroundColor: theme.palette.orderColor.PREPARED,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                    default:
                        return (
                            <Chip
                                label="Lỗi"
                                style={{
                                    backgroundColor: theme.palette.orderColor.DEFAULT,
                                    color: theme.palette.black.main,
                                    fontWeight: "600"
                                }} />
                        );
                }
            })()}
        </div>
    )
}
