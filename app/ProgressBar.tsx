import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  height: 1rem;
  overflow: hidden;
  font-size: 0.75rem;
  background-color: #e9ecef;
  border-radius: 0.25rem;
`;

const ProgressBarBar = styled.div<{ value: number; max: number }>`
  width: ${(props) => (props.value / props.max) * 100}%;
  background-color: ${(props) => (props.value > props.max ? '#ffc107' : '#28a745')};
  transition: width 0.6s ease;
`;

export default function ProgressBar(props: { value: number, max: number }) {
    if (props.value > props.max) {
        return (
            <ProgressBarContainer>
                <ProgressBarBar value={props.max} max={props.max} />
                <ProgressBarBar value={props.value - props.max} max={props.value + props.max} />
            </ProgressBarContainer>
        );
    }

    return (
        <ProgressBarContainer>
            <ProgressBarBar value={props.value} max={props.max} />
        </ProgressBarContainer>
    );
}
