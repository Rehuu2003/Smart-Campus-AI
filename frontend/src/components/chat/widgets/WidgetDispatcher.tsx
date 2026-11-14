import React from 'react';
import { motion } from 'framer-motion';
import { ChatWidget } from '@/types/chat';
import { AttendanceWidget } from './AttendanceWidget';
import { FeeBreakdownWidget } from './FeeBreakdownWidget';
import { TimetableWidget } from './TimetableWidget';
import { ExamScheduleWidget } from './ExamScheduleWidget';
import { AssignmentWidget } from './AssignmentWidget';

interface WidgetDispatcherProps {
  widget?: ChatWidget;
}

export function WidgetDispatcher({ widget }: WidgetDispatcherProps) {
  if (!widget) return null;

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'attendance':
        return <AttendanceWidget data={widget.data} />;
      case 'fee':
        return <FeeBreakdownWidget data={widget.data} />;
      case 'schedule':
        return <TimetableWidget data={widget.data} />;
      case 'exam':
        return <ExamScheduleWidget data={widget.data} />;
      case 'assignment':
        return <AssignmentWidget data={widget.data} />;
      default:
        return null;
    }
  };

  const content = renderWidgetContent();
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  );
}
